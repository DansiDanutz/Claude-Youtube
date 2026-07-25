import tempfile
import unittest
from pathlib import Path

from tools.editor.security import clean_path, request_token, resolve_project


class EditorSecurityTests(unittest.TestCase):
    def test_project_must_be_an_existing_videos_child(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            project = root / "videos" / "episode"
            project.mkdir(parents=True)
            self.assertEqual(resolve_project(root, "videos/episode"), project.resolve())
            for unsafe in (".", "videos/../outside", "../outside"):
                with self.assertRaises(ValueError):
                    resolve_project(root, unsafe)

    def test_token_comes_from_header_or_initial_query(self):
        self.assertEqual(request_token("/?token=query", None), "query")
        self.assertEqual(request_token("/?token=query", "header"), "header")
        self.assertEqual(clean_path("/api/data?token=x"), "/api/data")


if __name__ == "__main__":
    unittest.main()
