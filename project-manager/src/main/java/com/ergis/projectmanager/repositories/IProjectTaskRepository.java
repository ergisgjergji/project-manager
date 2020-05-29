package com.ergis.projectmanager.repositories;

import com.ergis.projectmanager.domain.ProjectTask;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProjectTaskRepository extends CrudRepository<ProjectTask, Long> {
}
