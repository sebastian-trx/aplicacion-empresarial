package org.example.cardgame.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.command.PonerCartaEnTablero;
import org.example.cardgame.events.*;
import org.example.cardgame.gateway.JuegoDomainEventRepository;
import org.example.cardgame.values.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.Set;
import java.util.function.Predicate;

import static org.mockito.Mockito.when;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class PonerCartaEnTableroUseCaseTest {

    //se mockea servicios o repositorios
    @Mock
    private JuegoDomainEventRepository repository;

    @InjectMocks
    private PonerCartaEnTableroUseCase useCase;

    @Test
    void ponerCarta(){
        //arrange
        var command = new PonerCartaEnTablero();
        command.setCartaId("cartaId");
        command.setJuegoId("juegoId");
        command.setJugadorId("jugadorId");
        when(repository.obtenerEventosPor("juegoId")).thenReturn(history());

        // act
        // permite suscribirme a un evento reactivo
        StepVerifier.create(useCase.apply(Mono.just(command)))
                .expectNextMatches(domainEvent -> {
                    var event = (CartaPuestaEnTablero)domainEvent;
                    Assertions.assertEquals("jugadorId",event.getJugadorId().value());
                    return "cartaId".equals(event.getCarta().value().cartaId().value());
                })
                .expectNextMatches(domainEvent -> {
                    var event = (CartaQuitadaDelMazo)domainEvent;
                    Assertions.assertEquals("jugadorId",event.getJugadorId().value());
                    return "cartaId".equals(event.getCarta().value().cartaId().value());
                })
                .expectComplete()
                .verify();

    }

    private Flux<DomainEvent> history() {
        var jugadorId = JugadorId.of("jugadorId");
        var jugadorId2 = JugadorId.of("jugadorId2");
        var cartas = Set.of(new Carta(
                CartaMaestraId.of("cartaId"),
                20,
                false,
                true
        ));
        return Flux.just(
                new JuegoCreado(jugadorId),
                new JugadorAgregado(jugadorId,"sebas",new Mazo(cartas)),
                new TableroCreado(new TableroId(), Set.of(jugadorId,jugadorId2)),
                new RondaCreada(new Ronda(1,Set.of(jugadorId,jugadorId2)), 50),
                new RondaIniciada()
        );
    }
}