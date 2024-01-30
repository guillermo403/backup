# Backup

Programa para crear copias de seguridad y subir a Google Drive

## Configuración

Se debe cambiar el archivo de configuración `config.json` con la configuración que se desee

```json
{
  "carpetas": [
    "/home/guillermo/Escritorio"
  ],
  "dias": [
    "Martes",
    "Jueves"
  ],
  "hora": "17:34",
  "id_carpeta_drive": "1kE4dZYy9ZCSCuHmGMcL0Rz8xY8DkRKDv"
}
```

**Explicación archivo de configuración:**

- carpetas:

```txt
Se pueden añadir tantas como se quiera separadas por comas (Se debe poner la ruta completa). Ejemplo:
[
  "C:\\Users\\pepe\\Documentos",
  "C:\\Users\\pepe\\Imagenes"
]
```

- días:

```txt
Indicar los días que se quiera hacer la copia. Días disponibles:
  Lunes
  Martes
  Miercoles
  Jueves
  Viernes
  Sabado
  Domingo
Sin tildes, escritos exactamente así
```

- hora:

```txt
Indica la hora a la que se hará la copia. Formato: HH:MM
```

id_carpeta_drive:

```txt
El ID de la carpeta a la que se subirá la copia a drive.
Se puede encontrar en
  Drive
    => Click derecho sobre la carpeta
      => Obtener enlace para compartir
        => El ID será parte de la URL. Por ejemplo, en ésta URL
https://drive.google.com/file/d/1iEh_LehnSaDwC3eBjJ61EwDpo3jnLvEn/view?usp=drive_link
Éste es el ID '1iEh_LehnSaDwC3eBjJ61EwDpo3jnLvEn'
```

## Conexión Google Drive

Para la conexión con Google Drive se debe ir a la consola de Google y crear las credenciales con OAUTH2.\
Una vez hecho, debe descargarse el archivo JSON, renombrarlo a `credential.json` y guardarlo en la carpeta `google-credentials` en la raíz del proyecto (La carpeta debe crearse).
