#!/bin/bash
docker compose up -d --build ngrok_composerize papaleo_app && docker logs -f papaleo_container