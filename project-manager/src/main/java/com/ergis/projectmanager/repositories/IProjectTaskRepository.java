package com.ergis.projectmanager.repositories;

import com.ergis.projectmanager.domain.Project;
import com.ergis.projectmanager.domain.ProjectTask;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProjectTaskRepository extends CrudRepository<ProjectTask, Long> {

    // The power of JPA stands in the naming of method
    List<ProjectTask> findByCodeOrderByPriority(String code);
}
