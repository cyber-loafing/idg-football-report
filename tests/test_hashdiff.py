from cfa_monitor.hashdiff import content_hash, summarize_diff


def test_hash_ignores_outer_timestamp_and_error_token() -> None:
    first = {"success": True, "result": {"errorCode": "10313", "token": "a"}, "timestamp": 1}
    second = {"success": True, "result": {"errorCode": "10313", "token": "b"}, "timestamp": 2}

    assert content_hash(first) == content_hash(second)


def test_diff_reports_changed_paths() -> None:
    old = {"result": {"liveData": {"matchDetails": {"scores": {"total": {"home": 0}}}}}}
    new = {"result": {"liveData": {"matchDetails": {"scores": {"total": {"home": 1}}}}}}

    diff = summarize_diff(old, new)

    assert diff["changed_paths"] == [
        {
            "kind": "changed",
            "path": "$.result.liveData.matchDetails.scores.total.home",
            "old": 0,
            "new": 1,
        }
    ]

