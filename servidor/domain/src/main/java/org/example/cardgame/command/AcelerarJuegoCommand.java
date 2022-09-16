package org.example.cardgame.command;

import co.com.sofka.domain.generic.Command;

public class AcelerarJuegoCommand extends Command {

    private String juegoId;

    private String jugadorId;

    public String getJuegoId() {
        return juegoId;
    }

    public void setJuegoId(String juegoId) {
        this.juegoId = juegoId;
    }

    public String getJugadorId() {
        return jugadorId;
    }

    public void setJugadorId(String jugadorId) {
        this.jugadorId = jugadorId;
    }
}
