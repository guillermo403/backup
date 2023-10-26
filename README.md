# Backups linux

Script para hacer backups en Linux

## USO

Ejecutar con el comando

```bash
bash backup.sh
```

## ARCHIVOS DE CONFIGURACIÓN

- **exclude-files.txt**\
    Especificar archivos a excluir de la copia de seguridad.
    Un directorio o archivo por línea

```txt
node_modules
.git
package-lock.json
pnpm-lock.yaml
```
