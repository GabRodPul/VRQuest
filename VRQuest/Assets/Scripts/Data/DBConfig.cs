using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public static class DBConfig 
{
    public const string ROUTE = "http://localhost";
    public const string PORT  = "8080";

    public static string Route()
    {
        return ROUTE + ":" + PORT;
    }
}