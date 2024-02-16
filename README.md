# Nombre del Proyecto

## Descripción

Este proyecto es un blog desarrollado utilizando Next.js, una biblioteca de React que facilita la creación de aplicaciones web de una sola página con renderizado del lado del servidor (SSR). Proporciona una estructura sólida para el desarrollo rápido y eficiente de aplicaciones web modernas.

El blog está diseñado para ser fácilmente personalizable y extensible, permitiendo a los usuarios agregar nuevas publicaciones, gestionar contenido y explorar temas de interés.

## Características

- **Renderizado del lado del servidor (SSR):** Mejora el rendimiento y la SEO al generar páginas web completamente renderizadas en el servidor.
- **Routing Dinámico:** Utiliza el enrutamiento dinámico de Next.js para generar rutas de forma automática a partir del contenido del blog.
- **Componentes Reutilizables:** Aprovecha las capacidades de componentización de React para crear componentes reutilizables y mantenibles.
- **Optimización de Imágenes:** Implementa técnicas de optimización de imágenes para mejorar el rendimiento de carga de la aplicación.


## Installation

1. Clona el repositorio en tu máquina local.
2. Instala las dependencias utilizando npm o yarn:


```bash
npm install
# o
yarn install
```
    
## Environment Variables

Para ejecutar este proyecto, deberá agregar las siguientes variables de entorno al archivo .env y .env.local

- **.env** 

`DATABASE_URL` => Api key prisma accelarate

- **.env** 

`GOOGLE_ID`  =>  ID de clientes - google (Credenciales) \
`GOOGLE_SECRET` => google secret code\
`AUTH_SECRET` => Llave de encriptación NextAuth - la definimos nosotros\
`AUTH_URL` => Dominio de la aplicaión\
`NEXT_PUBLIC_API_URL` => URL de la api -> [domino]/api\
`NEXT_PUBLIC_TINYMCE_API_KEY` =>  api key library tinymce\
`NEXT_PUBLIC_APP_HOSTNAME` => Dominio de la aplicaión\
`FIREBASE_API_KEY` => Firebase storage api key 
 


## Tech Stack

**Client:** Next js, React js,  TailwindCSS, Shadcdn, NextUI

**Server:** Next Auth, Prisma ORM, Prisma Acelerate , Mongo DB

