package com.example.SpringBootAngularDemo.DAO;


import com.example.SpringBootAngularDemo.models.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@RepositoryRestResource(path = "tareas", collectionResourceRel = "tareas")
@CrossOrigin
public interface TareaRepository extends JpaRepository<Tarea, Integer> {
}
