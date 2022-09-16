package org.example.cardgame.events;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.values.JugadorId;

public class JuegoAcelerado extends DomainEvent {

    private final JugadorId jugadorId;


    public JuegoAcelerado(JugadorId jugadorId) {
        super("cardgame.juegoacelerado");
        this.jugadorId = jugadorId;
    }

    public JugadorId getJugadorId() {
        return jugadorId;
    }


}
