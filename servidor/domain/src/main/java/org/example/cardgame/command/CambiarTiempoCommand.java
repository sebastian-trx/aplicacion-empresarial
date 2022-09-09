package org.example.cardgame.command;

import co.com.sofka.domain.generic.Command;
import org.example.cardgame.values.JuegoId;
import org.example.cardgame.values.TableroId;

public class CambiarTiempoCommand extends Command {
    private String juegoId;
    private TableroId tableroId;
    private Integer tiempo;

    public Integer getTiempo() {
        return tiempo;
    }

    public void setJuegoId(String juegoId) {
        this.juegoId = juegoId;
    }

    public String getJuegoId() {
        return juegoId;
    }

    public void setTiempo(Integer tiempo) {
        this.tiempo = tiempo;
    }

    public TableroId getTableroId() {
        return tableroId;
    }

    public void setTableroId(TableroId tableroId) {
        this.tableroId = tableroId;
    }
}
