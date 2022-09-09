package org.example.cardgame.usecase;

import org.example.cardgame.command.CrearJuegoCommand;
import org.example.cardgame.events.JuegoCreado;
import org.example.cardgame.events.JugadorAgregado;
import org.example.cardgame.gateway.ListaDeCartaService;
import org.example.cardgame.gateway.model.CartaMaestra;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.extension.Extension;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CrearJuegoUseCaseTest {

    @Mock
    private ListaDeCartaService listaDeCartaService;

    @InjectMocks
    private CrearJuegoUseCase useCase;

    @Test
    public void crearJuego(){
        var command = new CrearJuegoCommand();
        command.setJuegoId("juegoId");
        command.setJugadorPrincipalId("jugadorId");
        command.setJugadores(new HashMap<>());
        command.getJugadores().put("1","valor");
        command.getJugadores().put("2","valor2");
        when( listaDeCartaService.obtenerCartasDeMarvel()).thenReturn(history());

        StepVerifier.create(useCase.apply(Mono.just(command)))
                .expectNextMatches(domainEvent -> {
                    var event = (JuegoCreado)domainEvent;
                    Assertions.assertEquals("jugadorId",event.getJugadorPrincipal().value());
                    return "juegoId".equals(event.aggregateRootId());
                })
                .expectNextMatches(domainEvent -> {
                    var event =(JugadorAgregado)domainEvent;
                    Assertions.assertEquals(5, event.getMazo().value().cantidad());
                    return "valor2".equals(event.getAlias());
                })
                .expectNextMatches(domainEvent -> {
                    var event =(JugadorAgregado)domainEvent;
                    Assertions.assertEquals(5, event.getMazo().value().cantidad());
                    Assertions.assertEquals("valor", event.getAlias());
                    return "valor".equals(event.getAlias());
                })
                .expectComplete()
                .verify();
    }

    private Flux<CartaMaestra> history() {

        return Flux.just(
                new CartaMaestra("1","card1","qwe",2),
                new CartaMaestra("2","card1","qwe",2),
                new CartaMaestra("3","card1","qwe",2),
                new CartaMaestra("4","card1","qwe",2),
                new CartaMaestra("5","card1","qwe",2),
                new CartaMaestra("6","card1","qwe",2),
                new CartaMaestra("7","card1","qwe",2),
                new CartaMaestra("8","card1","qwe",2),
                new CartaMaestra("9","card1","qwe",2),
                new CartaMaestra("0","card1","qwe",2)
        );
    }
}