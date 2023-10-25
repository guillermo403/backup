#!/bin/bash

# import global variables
source ./config.sh
source ./colors.sh

BACKUP_NAME="${BACKUP_ORIGINAL_NAME}"
BACKUP_PATH=""
i=1

function log {
  if [ ! -f $LOG_FILE ]; then
    touch $LOG_FILE
  fi

  if [ ! -w $LOG_FILE ]; then
    echo "El archivo $LOG_FILE no tiene permisos de escritura"
    exit 1
  fi

  # Definimos el color y tipo de mensaje
  case "$2" in
    ERROR)
      typecolor=$RED
      type="ERROR"
      ;;
    WARNING)
      typecolor=$YELLOW
      type="WARNING"
      ;;
    SUCCESS)
      typecolor=$GREEN
      type="SUCCESS"
      ;;
    *)
      typecolor=$CYAN
      type="INFO"
      ;;
  esac

  # Escribimos el mensaje en el archivo de log
  echo -e "${BLUE}[$(date)]${ENDCOLOR} |${typecolor}${type}${ENDCOLOR}| # $1" >> $LOG_FILE
}

function set_backup_path {
  BACKUP_PATH="${SCRIPT_PATH}/${BACKUP_NAME}.tar.gz"
}

function check_files_to_exclude {
  if [ ! -f $FILES_TO_EXCLUDE ]
  then
    log "El archivo $FILES_TO_EXCLUDE no existe" "ERROR"
    exit 1
  fi
}

function check_destination_path {
  if [ ! -d $DESTINATION_PATH ]
  then
    log "El directorio $DESTINATION_PATH no existe" "ERROR"
    exit 1
  fi
}

function check_backup_path {
  # Comprobamos si el archivo de copia de seguridad ya existe y si es así, le añadimos un número al final
  if [ -f $BACKUP_PATH ]
  then
    ((i++))
    log "El archivo $BACKUP_PATH ya existe" "WARNING"
    BACKUP_NAME="${BACKUP_ORIGINAL_NAME}($i)"
    
    set_backup_path
    check_backup_path
  fi

}

function main {
  log "Inicio de la ejecución del script"

  # Comprobamos el archivo log y el nombre del archivo de copia de seguridad
  set_backup_path
  check_files_to_exclude
  check_destination_path
  check_backup_path

  # Nos movemos al directorio donde queremos crear la copia de seguridad
  cd $DESTINATION_PATH

  # Empaquetamos los archivos y directorios que queremos copiar
  tar --exclude-from=$FILES_TO_EXCLUDE -zcvf $BACKUP_PATH * &> /dev/null

  # Comprobamos si la copia de seguridad se ha creado correctamente
  if [ $? -eq 0 ]
  then
      log "Copia de seguridad creada correctamente en: ${BACKUP_PATH}" "SUCCESS"
  else
      log "Error al crear la copia de seguridad" "ERROR"
  fi

  log "Fin de la ejecución del script"
}

main