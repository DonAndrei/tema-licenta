package org.java.licenta.managementstocuri.Produse.repository;

import org.java.licenta.managementstocuri.Produse.model.Produs;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProdusRepository {
    private final JdbcTemplate jdbcTemplate;

    public ProdusRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Produs> findAll() {
        return jdbcTemplate.query("SELECT * FROM produse", (rs, rowNum) ->
                new Produs(
                        rs.getInt("id"),
                        rs.getString("nume"),
                        rs.getString("descriere"),
                        rs.getInt("cantitate")
                )
        );
    }
}
