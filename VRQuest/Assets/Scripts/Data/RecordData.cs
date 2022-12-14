using System.Collections;
using System.Collections.Generic;
using UnityEngine;

// public struct RecordData : IData
// {
//     public string gid { get; set; }
//     public string playerId { get; set; }
//     public int score { get; set; }
//     public int powerups { get; set; }
//     public int time { get; set; }

//     public Dictionary<string, string> ToStringDict()
//     {
//         return new Dictionary<string, string>() {
//             { "gid",        gid },
//             { "playerId",   playerId },
//             { "score",      score.ToString() },
//             { "powerups",   powerups.ToString() },
//             { "time",       time.ToString() },
//         };
//     }

//     public static RecordData FromJson(string jsonString) {
//         return JsonUtility.FromJson<RecordData>(jsonString);
//     }

//     // public string ToJson() {
//     //     return JsonUtility.ToJson(this);
//     // }

//     public string ToJson() {
//         return "{" +  
//             "\"gid\": "      + "\""     + gid      + "\"" + "," +
//             "\"playerId\": " + "\""     + playerId + "\"" + "," +
//             "\"score\": "               + score    + "," +
//             "\"powerups\": "            + powerups + "," +
//             "\"time\": "                + time     +
//         "}";
//     }
// }

public struct RecordData
{
    public string gid;
    public string playerId;
    public int score;
    public int powerups;
    public int time;
}