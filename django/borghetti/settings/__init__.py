'''
Base definition of settings import
'''
# pytlint: disable=wildcard-import
# flake8: noqa
import os
from django.utils.version import get_version

if os.getenv('MODE') == 'production':
    from borghetti.settings.production import *  # pylint: disable=W0614,W0401
elif os.getenv('MODE') == 'ci':
    from borghetti.settings.ci import *  # pylint: disable=W0614,W0401
else:
    from borghetti.settings.development import *  # pylint: disable=W0614,W0401

with open(os.path.join(BASE_DIR, '..', 'VERSION'), 'r') as version_file:
    VERSION = version_file.read().strip().split('.')

__version__ = get_version(VERSION)

if not os.path.exists(os.path.join(BASE_DIR, '..', 'HASH')):
    LATEST_HASH = 'dev'
else:
    with open(os.path.join(BASE_DIR, '..', 'HASH'), 'r') as hash_file:
        LATEST_HASH = hash_file.read().strip()
