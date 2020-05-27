package com.ergis.projectmanager.repositories;

import com.ergis.projectmanager.domain.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProjectRepository extends CrudRepository<Project, Long> {

    Project findByCode(String code);

    @Override
    Iterable<Project> findAll();
}
