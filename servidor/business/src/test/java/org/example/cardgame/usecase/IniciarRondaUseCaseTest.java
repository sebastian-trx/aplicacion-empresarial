package org.example.cardgame.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.command.IniciarRondaCommand;
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

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class IniciarRondaUseCaseTest {

    @Mock
    private JuegoDomainEventRepository repository;

    @InjectMocks
    private IniciarRondaUseCase useCase;

    @Test
    public void iniciarRonda(){
        //arrange
        var command = new IniciarRondaCommand();
        command.setJuegoId("juegoId");
        when(repository.obtenerEventosPor("juegoId")).thenReturn(history());

        StepVerifier.create(useCase.apply(Mono.just(command)))
                .expectNextMatches(domainEvent -> {
                    var event = (RondaIniciada)domainEvent;
                    Assertions.assertEquals("juegoId", event.aggregateRootId());
                    return "juegoId".equals( event.aggregateRootId());
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
                new JugadorAgregado(jugadorId2,"sebas2",new Mazo(cartas)),
                new TableroCreado(new TableroId(), Set.of(jugadorId,jugadorId2)),
                new RondaCreada(new Ronda(1,Set.of(jugadorId,jugadorId2)), 50),
                new RondaIniciada()
        );
    }
}