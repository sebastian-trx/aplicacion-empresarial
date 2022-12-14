package org.example.cardgame.values;

import co.com.sofka.domain.generic.ValueObject;

import java.util.Set;

public class Ronda implements ValueObject<Ronda.Props> {
    private final Set<JugadorId> jugadores;
    private final Integer numero;
    private final Boolean estaIniciada;

    public Ronda(Integer numero, Set<JugadorId> jugadores) {
        this.jugadores = jugadores;
        this.numero = numero;
        this.estaIniciada = false;
        if(numero <= 0){
            throw new IllegalArgumentException("El numero de la ronda debe no puede ser cero o negativo");
        }
        if(jugadores.size() <= 1){
            throw new IllegalArgumentException("La ronda se crea con minimo 2 jugadores");
        }
    }

    private Ronda(Integer numero, Set<JugadorId> jugadores, Boolean estaIniciada) {
        this.jugadores = jugadores;
        this.numero = numero;
        this.estaIniciada = estaIniciada;
    }

    public Ronda iniciarRonda(){
        return new Ronda(this.numero, this.jugadores, true);
    }

    public Ronda terminarRonda(){
        return new Ronda(this.numero, this.jugadores, false);
    }

    public Ronda incrementarRonda(Set<JugadorId> jugadores){
        return new Ronda(this.numero + 1, jugadores, false);
    }
    @Override
    public Props value() {
        return new Props() {
            @Override
            public Set<JugadorId> jugadores() {
                return jugadores;
            }

            @Override
            public Integer numero() {
                return numero;
            }

            @Override
            public Boolean estaIniciada() {
                return estaIniciada;
            }
        };
    }



    public interface Props {
        Set<JugadorId> jugadores();
        Integer numero();
        Boolean estaIniciada();
    }
}