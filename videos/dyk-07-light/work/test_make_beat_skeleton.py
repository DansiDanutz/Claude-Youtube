"""Shot boundaries inside a second must keep both shots' words (PR #26 review)."""
import make_beat_skeleton as m


def test_words_in_a_shared_boundary_second_are_kept():
    table, _ = m.rows()
    by_sec = {sec: (shot, said) for sec, shot, said in table}
    assert "Six" in by_sec[57][1].split(), by_sec[57]
    assert "Here's" in by_sec[446][1].split(), by_sec[446]


def test_one_row_per_second_and_every_spoken_word_kept():
    table, total = m.rows()
    secs = [sec for sec, _, _ in table]
    assert secs == list(range(len(secs))), "one row per second, in order"
    spoken = sum(len(m.VO[sid]["words"]) for _, offs in m.TL.values() for sid in offs)
    assert sum(len(said.split()) for _, _, said in table) == spoken


def test_a_shared_second_names_both_shots():
    table, _ = m.rows()
    assert dict((sec, shot) for sec, shot, _ in table)[57] == "LtWelcome / LtPromise"
