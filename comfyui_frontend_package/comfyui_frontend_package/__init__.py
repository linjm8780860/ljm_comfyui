from importlib.metadata import version, PackageNotFoundError

try:
    __version__ = version("comfyui-frontend-package-ljm")
except PackageNotFoundError:
    __version__ = "unknown"
