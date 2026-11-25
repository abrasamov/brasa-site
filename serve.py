"""Servidor local do site BRASA, sem cache.

Igual a `python3 -m http.server`, mas avisa o navegador para não guardar cópias
das páginas: toda vez que você recarrega, aparece a versão mais nova dos arquivos.

Uso: python3 serve.py   (abre em http://localhost:5173)
"""
import functools
import http.server
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 5173
ROOT = os.path.dirname(os.path.abspath(__file__))


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    handler = functools.partial(NoCacheHandler, directory=ROOT)
    with http.server.ThreadingHTTPServer(("127.0.0.1", PORT), handler) as httpd:
        print(f"BRASA em http://localhost:{PORT} (sem cache). Ctrl+C para parar.")
        httpd.serve_forever()
