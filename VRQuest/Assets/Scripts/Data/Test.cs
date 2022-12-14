using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Test : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        Debug.Log("Starting AuthController.Login...");
        StartCoroutine(AuthController.Login(
            new PlayerData
            {
                username = "test",
                password = "test",
            }
        ));
    }

    void RDTest()
    {
        Debug.Log("Starting RecordController.Create...");
        StartCoroutine(RecordController.Create(
            new RecordData
            {
                gid = "",
                playerId = "clbmfl0x90000o7i4eff7jn4c",
                score = 9,
                powerups = 2,
                time = 12345329
            }
        ));
    }

    // Update is called once per frame
    void Update()
    {

    }
}