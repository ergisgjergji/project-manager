package com.ergis.projectmanager.repositories;

import com.ergis.projectmanager.domain.Backlog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBacklogRepository extends CrudRepository<Backlog, Long> {

    // We need Backlog Repository only to make sure the Backlog exists
    Backlog findByProject_code(String code);
}