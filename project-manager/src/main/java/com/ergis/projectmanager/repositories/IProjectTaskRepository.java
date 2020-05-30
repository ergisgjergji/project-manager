package com.ergis.projectmanager.repositories;

import com.ergis.projectmanager.domain.Project;
import com.ergis.projectmanager.domain.ProjectTask;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProjectTaskRepository extends CrudRepository<ProjectTask, Long> {

    List<ProjectTask> findByCodeOrderByPriority(String code);

    ProjectTask findBySequence(String sequence);
}
