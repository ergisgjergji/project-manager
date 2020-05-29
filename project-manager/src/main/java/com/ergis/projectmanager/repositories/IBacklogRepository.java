package com.ergis.projectmanager.repositories;

import com.ergis.projectmanager.domain.Backlog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBacklogRepository extends CrudRepository<Backlog, Long> {
}
