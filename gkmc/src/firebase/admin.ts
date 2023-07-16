import firebaseAdmin from 'firebase-admin'
import { cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

if (firebaseAdmin && firebaseAdmin.apps.length === 0) {
  firebaseAdmin.initializeApp({
    credential: cert({
      clientEmail: 'firebase-adminsdk-m7cx9@croonic-b9bf8.iam.gserviceaccount.com',
      privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQD19/v2mMLYL83g\nRH1OxlAuGId+6MmpFTLF81ZCYu16yNcAwee7qa0nufAT3VKZzTHI9qXY0a4UGtvn\n4pk/4VsX10N1UBtFMahjOiuRBwTndWQ8M299LBEaxMw0E5jEFdTD0nEgYI2Uw8IS\nxEeQ01PkAv2ZBorTSCMYNqd9sQvMEQnbE8jTZOX3MKbh6cQpDTlahZg6AWf+Sh0h\neikZCCv9L/ZVRoWpTqnDaStuJVYVZadJA+dTKgQ2uqvyn63Czs28F6Ea79Jw7DhZ\nJyGgQFnfkeOLHQgBotskexupkS2XLWx2WVzMoKlt+96cZhANNXWtU+7tWYw27HQR\ng/Db6S9pAgMBAAECggEAJkZ75rSAU4Bi3tSBlF3PUdD+2rySTvWtxDh40pVO46W3\nsVY7P4xolc89IPY2mZjg96cMCUiduGKymCu+kb55fKUCihGYYMTYsXI2n9eSB4uQ\nuL5/SaDvG3WG2k63XcIQ7RUFBhcISR9KRr3U7iA4hHmDqYmnVjf6QBUXLLu9fHhX\nMaR8IfDXbndGMcK0oiVjMVVJ7gVqz5vEvJ2e07ZGJP0LWTnj3RfMC0VuI1x2HwNE\nDrQgnmrmAMsJ/bDMm97m+t2rDPI5UvGH992rTJ9ADibdN75pHjBg61bXhT6jbLBu\ngu4kkCV1EhhHv1RpgdT1dBS7dwFUNjkvQer119hndQKBgQD6+LGLPry97heAajw3\nD9FI4JX149Xz+2/9ivKgZMEO8Vr7y4tH5a/U1WunggwnGf1gkm0oBaPeZ5oks957\nqoEgUFbM0dea6s56K0C6HyVskdRPNM42B21T4scddtE9a9Dt2kutLzijbY51/UNc\n7VSNGqV7A1yEuAQlHgEPlonj9QKBgQD65aFI0nc8MPfZFRWvRD8Zm3RWXONx7U/u\nveMgq/dkWvsup/+0pjccmFqyj7aE6hB/cf+SpqFxNJiRHf0jizpb0A75lbGcTKER\najyAT4h4GnCMxbivwqhebbHWck4On3NiA+RHo9T/9PwE4Yb5oYIG6hiAtdMaWKXW\nfrrLj/UpJQKBgGvGwPf7STKHPLB47sL2l/mj+MJPxWGxaLaJJQicPAweuePH1Vha\n2tebj0+wGWfxUU5Xk2jMg0LPWvLIC5Mv9aPa3Gu48c4lZ+YvDOzg00F8nqAlHSk2\np0yO5tNQYyrtUhvS0wzcaoZEVhl1WahegyDVgJsDJogYPi9yYyI+k5jBAoGBAIUi\nRKs3wz2VXm862P7f3/vemaUaNTbHDptI97Tmi6gc/xyK2Q0rBiOOVNJboCZ3bbmy\n7EMNWK2Rk0Ot/h1WS+lcRhX6cPzXTMDI9sG/clMI9KA+avoY+O7ilnOMxA7OXZOt\nLP022lfXz8NnSRA9u5mfrtDdqt9YGufu54ANK7JhAoGBAPCF9Kkv1smnyNuX48/X\nkCaJa4oTaW44AuArzJtgnfRQoeIL5GSX0S0pTjo6ixkxCMOx0u5UYS2PodGroFYU\n57bFiur9/b/Ygr0h4abpHyWQ2KeKbolzst6Ig/y2lJxw7xivEMcYCEpu1LeVkDPv\nxAOX9FgBYYamwrby1TSqEhQL\n-----END PRIVATE KEY-----\n',
      projectId: 'croonic-b9bf8'
    })
  })
}

export const adminAuth = getAuth(firebaseAdmin.app())