"""Regression tests for the Did You Know That? No. 03 ("School") pipeline.

make_script.py runs as a black box on a copy of the work dir (no paid call, no render).
"""
import importlib.util
import json
import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock

WORK = Path(__file__).resolve().parents[1] / "videos" / "dyk-03-school" / "work"


def load(name):
    spec = importlib.util.spec_from_file_location(f"dyk03_{name}", WORK / f"{name}.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class MakeScriptRerunTests(unittest.TestCase):
    """Review PRRT_kwDOTfGVps6rqKON: a rerun reset accepted single-chunk speeds to 1.0."""

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.work = Path(self.tmp.name) / "work"
        (self.work / "narration" / "chunks").mkdir(parents=True)
        for name in ("make_script.py", "gen_voice.py"):
            shutil.copy(WORK / name, self.work / name)
        self.script = self.work / "narration" / "script.json"

    def tearDown(self):
        self.tmp.cleanup()

    def run_make_script(self):
        subprocess.run([sys.executable, str(self.work / "make_script.py"), str(self.script)],
                       check=True, capture_output=True, text=True)
        return json.loads(self.script.read_text())

    @staticmethod
    def speeds(doc):
        return {sc["id"]: [c["speed"] for c in sc["chunks"]] for sc in doc["scenes"]}

    def test_rerun_keeps_accepted_single_chunk_speeds_without_a_bak(self):
        shutil.copy(WORK / "narration" / "script.json", self.script)   # no chunk caches, no .bak
        before = self.speeds(json.loads(self.script.read_text()))
        after = self.speeds(self.run_make_script())
        self.assertEqual(after["sc02-question"], [1.035])
        self.assertEqual(after["sc03-promise"], [0.969])
        self.assertEqual(after, before)                                   # multi-chunk speeds too

    def test_stale_bak_is_ignored(self):
        shutil.copy(WORK / "narration" / "script.json", self.script)
        stale = json.loads(self.script.read_text())
        for sc in stale["scenes"]:
            for c in sc["chunks"]:
                c["speed"] = 1.0
        Path(str(self.script) + ".bak").write_text(json.dumps(stale))
        self.assertEqual(self.speeds(self.run_make_script())["sc02-question"], [1.035])

    def test_scene_level_speed_is_carried_for_unchanged_text(self):
        doc = json.loads((WORK / "narration" / "script.json").read_text())
        sc02 = next(sc for sc in doc["scenes"] if sc["id"] == "sc02-question")
        ch = sc02.pop("chunks")[0]
        sc02.update(text=ch["text"], pace=ch["pace"], speed=1.035)       # older chunk-less layout
        self.script.write_text(json.dumps(doc))
        self.assertEqual(self.speeds(self.run_make_script())["sc02-question"], [1.035])

    def test_changed_text_starts_from_the_default_speed(self):
        doc = json.loads((WORK / "narration" / "script.json").read_text())
        sc02 = next(sc for sc in doc["scenes"] if sc["id"] == "sc02-question")
        sc02["chunks"][0]["text"] = "An older wording of the question."
        self.script.write_text(json.dumps(doc))
        self.assertEqual(self.speeds(self.run_make_script())["sc02-question"], [1.0])

    def test_rerun_on_the_committed_script_changes_nothing(self):
        committed = (WORK / "narration" / "script.json").read_text()
        self.script.write_text(committed)
        for meta in (WORK / "narration" / "chunks").glob("*.json"):
            shutil.copy(meta, self.work / "narration" / "chunks" / meta.name)
        self.run_make_script()
        self.assertEqual(self.script.read_text(), committed)

    def test_import_has_no_side_effects(self):
        with mock.patch.object(sys, "argv", ["unittest"]):
            module = load("make_script")
        self.assertTrue(callable(module.main))


if __name__ == "__main__":
    unittest.main()
