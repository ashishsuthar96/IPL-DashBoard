package com.ipldashborad.Repository;

import org.springframework.data.repository.CrudRepository;

import com.ipldashborad.entity.Team;

public interface TeamRepository extends CrudRepository<Team, Long> {
	
	Team findByTeamName(String teamName);

}
