"""Production extension settings."""
import logging.config
import os

from borghetti.settings.main import *  # noqa pylint: disable=W0614,W0401

DEBUG = False

ALLOWED_HOSTS = ['*']

COMPRESS_OFFLINE = True

STATIC_ROOT = os.getenv('STATIC_ROOT')
MEDIA_ROOT = os.getenv('MEDIA_ROOT')

LOGFILE_ROOT = os.path.join(BASE_DIR, 'logs/production')  # NOQA
LOGFILE_ROOT = os.getenv('LOGS_ROOT', LOGFILE_ROOT)
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '[%(asctime)s] [%(pathname)s:%(lineno)s] %(message)s',
        },
    },
    'filters': {
        'debug': {
            '()': 'borghetti.log_filters.DebugFilter',
        },
        'info': {
            '()': 'borghetti.log_filters.InfoFilter',
        },
        'error': {
            '()': 'borghetti.log_filters.ErrorFilter',
        },
    },
    'handlers': {
        'django.info': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(LOGFILE_ROOT, 'django_info.log'),
            'formatter': 'verbose',
            'maxBytes': 1024 * 1024 * 2,
            'backupCount': 10,
            'filters': ['info']
        },
        'django.error': {
            'level': 'ERROR',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(LOGFILE_ROOT, 'django_error.log'),
            'formatter': 'verbose',
            'maxBytes': 1024 * 1024 * 2,
            'backupCount': 10,
            'filters': ['error']
        },
        'django.debug': {
            'level': 'DEBUG',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(LOGFILE_ROOT, 'django_debug.log'),
            'formatter': 'verbose',
            'maxBytes': 1024 * 1024 * 2,
            'backupCount': 10,
            'filters': ['debug']
        },
        'ldap.info': {
            'level': 'DEBUG',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(LOGFILE_ROOT, 'ldap_info.log'),
            'formatter': 'verbose',
            'maxBytes': 1024 * 1024 * 2,
            'backupCount': 10,
            'filters': ['debug']
        },
    },
    'loggers': {
        'django': {
            'level': 'DEBUG',
            'handlers': ['django.info', 'django.error', 'django.debug'],
            'propagate': True,
        },
        'django_auth_ldap': {
            'level': 'DEBUG',
            'handlers': ['ldap.info'],
            'propagate': True,
        },
    }
}
logging.config.dictConfig(LOGGING)
