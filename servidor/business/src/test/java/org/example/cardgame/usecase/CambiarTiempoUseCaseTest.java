package org.example.cardgame.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.command.CambiarTiempoCommand;
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
class CambiarTiempoUseCaseTest {

    @Mock
    private JuegoDomainEventRepository repository;

    @InjectMocks
    private CambiarTiempoUseCase useCase;

    @Test
    void cambiarTiempoTablero(){
        //arrange
        var command = new CambiarTiempoCommand();
        command.setJuegoId("juegoId");
        command.setTiempo(30);
        command.setTableroId(new TableroId());
        when(repository.obtenerEventosPor("juegoId")).thenReturn(history());

        StepVerifier.create(useCase.apply(Mono.just(command)))
                .expectNextMatches(domainEvent -> {
                    var event = (TiempoCambiadoDelTablero)domainEvent;
                    Assertions.assertEquals(30, event.getTiempo());
                    return 30 == event.getTiempo();
                })
                .expectComplete()
                .verify();
    }

    private Flux<DomainEvent> history() {
        var jugadorId = JugadorId.of("jugadorId");
        var jugadorId2 = JugadorId.of("jugadorId2");
        var tableroId = new TableroId();
        return Flux.just(
                new JuegoCreado(jugadorId),
                new TableroCreado(tableroId, Set.of(jugadorId,jugadorId2)),
                new TiempoCambiadoDelTablero(tableroId,30)
        );
    }
}