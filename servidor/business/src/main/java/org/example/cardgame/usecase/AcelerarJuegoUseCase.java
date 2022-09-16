package org.example.cardgame.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.Juego;
import org.example.cardgame.command.AcelerarJuegoCommand;
import org.example.cardgame.command.FinalizarRondaCommand;
import org.example.cardgame.gateway.JuegoDomainEventRepository;
import org.example.cardgame.values.JuegoId;
import org.example.cardgame.values.JugadorId;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.stream.Collectors;

public class AcelerarJuegoUseCase extends UseCaseForCommand<AcelerarJuegoCommand> {
    private final JuegoDomainEventRepository repository;
        private final FinalizarRondaUseCase finalizarRondaUseCase;

    public AcelerarJuegoUseCase(JuegoDomainEventRepository repository, FinalizarRondaUseCase finalizarRondaUseCase) {
        this.repository = repository;
        this.finalizarRondaUseCase = finalizarRondaUseCase;
    }

    @Override
    public Flux<DomainEvent> apply(Mono<AcelerarJuegoCommand> acelerarJuegoCommand) {
        var finalizarCommand = new FinalizarRondaCommand();
        return acelerarJuegoCommand.flatMapMany((command) -> repository
                .obtenerEventosPor(command.getJuegoId())
                .collectList()
                .flatMapIterable(events -> {
                    var juego = Juego.from(JuegoId.of(command.getJuegoId()),events);
                    finalizarCommand.setJuegoId(command.getJuegoId());
                    var jugadorId = JugadorId.of(command.getJugadorId());
                    var jugadoresVivos = juego.jugadores().values().stream()
                                    .filter(jugador -> jugador.mazo().value().cantidad()>0)
                                            .collect(Collectors.toList());
                    var jugadoresAcelerados = juego.tablero().Jugadores();
                    juego.acelerarJuego(jugadorId);
                    if(jugadoresVivos.size() == jugadoresAcelerados.size()){
                        System.out.println(jugadoresAcelerados);
                        System.out.println("finalizarRondaUseCase");

                    }

                    return juego.getUncommittedChanges();
                })
        );
    }
}
