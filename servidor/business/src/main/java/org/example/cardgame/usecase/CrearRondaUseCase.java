package org.example.cardgame.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.Juego;
import org.example.cardgame.command.CrearRondaCommand;
import org.example.cardgame.gateway.JuegoDomainEventRepository;
import org.example.cardgame.values.JuegoId;
import org.example.cardgame.values.JugadorId;
import org.example.cardgame.values.Ronda;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.stream.Collectors;

public class CrearRondaUseCase extends UseCaseForCommand<CrearRondaCommand> {

    private final JuegoDomainEventRepository repository;

    public CrearRondaUseCase(JuegoDomainEventRepository repository) {
        this.repository = repository;
    }

    @Override
    public Flux<DomainEvent> apply(Mono<CrearRondaCommand> crearRondaCommandMono) {
        return crearRondaCommandMono.flatMapMany((comando) ->
                repository
                        .obtenerEventosPor(comando.getJuegoId()).collectList()
                        .flatMapIterable(event -> {
                            var juego = Juego.from(JuegoId.of(comando.getJuegoId()), event);
                            var jugadores = comando.getJugadores().stream()
                                    .map(JugadorId::of)
                                    .collect(Collectors.toSet());
                            var ronda = new Ronda(1, jugadores);
                            juego.crearRonda(ronda, comando.getTiempo());

                            return juego.getUncommittedChanges();

                        })
        );
    }
}
