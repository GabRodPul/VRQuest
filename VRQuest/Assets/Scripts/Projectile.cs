using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Weapon : MonoBehaviour
{
    // Projectile
    public GameObject projectile;

    // Bullet force
    public float shootForce;

    // Weapon stats
    public float cooldown, spread;
    public int maxAmmo, fireRate;
    public bool allowHold;
    int ammoLeft;

    public GameObject shootPoint;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    void Shoot()
    {
    //     RaycastHit hit;
    //     Quaternion fireRotation = Quaternion.LookRotation(transform.forward);
 
    //     GameObject tempBullet = Instantiate(projectile, shootPoint.transform.position, fireRotation);
    //     tempBullet.GetComponent<ProyectilePhysics>().hitPoint = hit.point;
    }
}
