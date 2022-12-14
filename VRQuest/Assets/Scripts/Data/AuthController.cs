using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class AuthController : MonoBehaviour
{
    private const string ENDPOINT = "/api/players";
    public static string route = DBConfig.Route() + ENDPOINT;

    public static IEnumerator Login(PlayerData player)
    {
        string json = JsonUtility.ToJson(player);
        Debug.Log(json);
        using (var webRequest = UnityWebRequest.Put(route + "/login", json))
        {
            webRequest.method = "POST";
            webRequest.SetRequestHeader("Content-Type", "application/json");
            yield return webRequest.SendWebRequest();
        
            Debug.Log("UWR (Player Login) result: " + webRequest.result);
            if (webRequest.result != UnityWebRequest.Result.Success)
            {
                Debug.Log(webRequest.error);
                yield break;
            }
        
            string jsonResult = webRequest.downloadHandler.text;
            Debug.Log(jsonResult);
            
            var error = JsonUtility.FromJson<ErrorData>(jsonResult);
            if (error.code != null) {
                // TODO: Add a way to notify the failure to the user.
                yield break;
            }

            var playerResult = JsonUtility.FromJson<PlayerData>(jsonResult);
            Global.CurrentPlayer = new PlayerData
            {
                pid          = playerResult.pid,
                username     = playerResult.username,
                access_token = playerResult.access_token
            };
        }
    }
}
