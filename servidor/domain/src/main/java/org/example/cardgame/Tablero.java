package org.example.cardgame;

import co.com.sofka.domain.generic.Entity;
import org.example.cardgame.values.Carta;
import org.example.cardgame.values.JugadorId;
import org.example.cardgame.values.TableroId;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class Tablero extends Entity<TableroId> {
    private Integer tiempoEnSegundos;
    private Boolean estaHabilitado;

    private Set<JugadorId> jugadores;

    private final Map<JugadorId, Set<Carta>> partida;

    public Tablero(TableroId entityId, Set<JugadorId> jugadorIds) {
        super(entityId);
        this.partida = new HashMap<>();
        this.estaHabilitado = false;
        this.jugadores = new HashSet<>();
        jugadorIds.forEach(jugadorId -> partida.put(jugadorId, new HashSet<>()));
    }

    public void ajustarTiempo(Integer tiempo){
        this.tiempoEnSegundos = tiempo;
    }


    public Integer tiempo() {
        return tiempoEnSegundos;
    }

    public void adicionarPartida(JugadorId jugadorId, Carta carta){
        partida.getOrDefault(jugadorId, new HashSet<>()).add(carta);
    }

    public void acelerarPartida(JugadorId jugadorId){
        jugadores.add(jugadorId);
    }

    public void quitarCarta(JugadorId jugadorId, Carta carta){
        partida.getOrDefault(jugadorId, new HashSet<>()).remove(carta);
    }

    public void habilitarApuesta(){
        this.estaHabilitado = true;
    }

    public void inhabilitarApuesta(){
        this.estaHabilitado = false;
    }

    public void reiniciarPartida(){
        partida.clear();
    }

    public Boolean estaHabilitado() {
        return estaHabilitado;
    }

    public Map<JugadorId, Set<Carta>> partida() {
        return partida;
    }

    public Set<JugadorId> Jugadores() {return jugadores;}
}
