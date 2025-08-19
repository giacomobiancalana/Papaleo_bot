#!/bin/bash
docker compose up -d --build ngrok_composerize_macos papaleo_app && docker logs -f papaleo_container