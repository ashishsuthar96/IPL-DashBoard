package com.ipldashborad.controller;



import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ipldashborad.Repository.MatchRepository;
import com.ipldashborad.Repository.TeamRepository;
import com.ipldashborad.entity.Match;
import com.ipldashborad.entity.Team;

@RestController
@CrossOrigin
public class TeamController {
	
	@Autowired
	private TeamRepository teamRepository;
	
	@Autowired
	private MatchRepository matchRepository;
	
	@GetMapping("/team/{teamName}")
	public Team getTeam(@PathVariable String teamName) {
		Team team = this.teamRepository.findByTeamName(teamName);
		team.setLatestMatches(this.matchRepository.findLatestMatchesByTeam(teamName, 4));
		return team;
	}
	
	@GetMapping("/team/{teamName}/matches")
	public List<Match> getMatchForTeam(@PathVariable String teamName, @RequestParam int year) {
		LocalDate startDate= LocalDate.of(year, 1,1);
		LocalDate endDate= LocalDate.of(year+1, 1,1);
		return this.matchRepository.getMatchesByTeamBetweenDates(teamName, startDate, endDate);
		
	}
	
	@GetMapping("/team")
	public Iterable<Team> getAllTeam() {
		
		return this.teamRepository.findAll();
		
	}
	
	
	
	

}
