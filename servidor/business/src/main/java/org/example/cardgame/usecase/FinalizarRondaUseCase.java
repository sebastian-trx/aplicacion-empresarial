package org.example.cardgame.usecase;

import co.com.sofka.domain.generic.DomainEvent;

import org.example.cardgame.Juego;
import org.example.cardgame.command.FinalizarRondaCommand;
import org.example.cardgame.gateway.JuegoDomainEventRepository;
import org.example.cardgame.values.Carta;
import org.example.cardgame.values.JuegoId;
import org.example.cardgame.values.JugadorId;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashSet;
import java.util.Set;
import java.util.TreeMap;
import java.util.stream.Collectors;

public class FinalizarRondaUseCase extends UseCaseForCommand<FinalizarRondaCommand> {

    private final JuegoDomainEventRepository repository;

    public FinalizarRondaUseCase(JuegoDomainEventRepository repository){
        this.repository = repository;
    }

    @Override
    public Flux<DomainEvent> apply(Mono<FinalizarRondaCommand> finalizarRondaCommand) {
        return finalizarRondaCommand.flatMapMany((command) -> repository
                .obtenerEventosPor(command.getJuegoId())
                .collectList()
                .flatMapIterable(events -> {

                    var juego = Juego.from(JuegoId.of(command.getJuegoId()), events);
                    TreeMap<Integer, String> partidaOrdenada = new TreeMap<>((t1, t2) -> t2 - t1);
                    Set<Carta> cartasEnTablero = new HashSet<>();
                    juego.tablero().partida().forEach((jugadorId, cartas) -> {
                        cartas.stream()
                                .map(c -> c.value().poder())
                                .reduce(Integer::sum)
                                .ifPresent(puntos -> {
                                    partidaOrdenada.put(puntos, jugadorId.value());
                                    cartasEnTablero.addAll(cartas);
                                });

                    });

                    var competidores = partidaOrdenada.values()
                            .stream()
                            .map(JugadorId::of)
                            .collect(Collectors.toSet());
                    var partida =  partidaOrdenada.firstEntry();
                    var ganadorId = partida.getValue();
                    var puntos = partida.getKey();

                    juego.asignarCartasAGanador(JugadorId.of(ganadorId), puntos, cartasEnTablero);
                    juego.terminarRonda(juego.tablero().identity(), competidores);

                    return juego.getUncommittedChanges();
                }));
    }


}