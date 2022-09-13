package org.example.cardgame.application.handle.materialize;

import co.com.sofka.domain.generic.DomainEvent;
import org.bson.Document;
import org.example.cardgame.events.JuegoCreado;
import org.example.cardgame.events.JugadorAgregado;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;

@Configuration
public class MazoMaterializeHandle {

    private static final String COLLECTION_VIEW = "mazoview";

    private final ReactiveMongoTemplate template;

    public MazoMaterializeHandle(ReactiveMongoTemplate template) {
        this.template = template;
    }



    @EventListener
    public void handleJugadorAgregado(JugadorAgregado event) {
        var mazo = event.getMazo().value();
        var data = new Document();
        var cartas = new ArrayList<>();
        data.put("uid", event.getJuegoId().value());
        data.put("juegoId", event.aggregateRootId());
        data.put("cantidad", mazo.cartas().size());
        data.put("fecha", Instant.now());

        mazo.cartas().forEach(carta -> {
            var documentCarta = new Document();
            documentCarta.put("poder", carta.value().poder());
            documentCarta.put("cartaId", carta.value().cartaId().value());
            documentCarta.put("estaHabilitada", carta.value().estaHabilitada());
            documentCarta.put("estaOculta", carta.value().estaOculta());
            cartas.add(documentCarta);
        });
        data.put("cartas", cartas);

        template.save(data, COLLECTION_VIEW).block();
    }

    private Query getFilterByAggregateId(DomainEvent event) {
        return new Query(
                Criteria.where("_id").is(event.aggregateRootId())
        );
    }

}