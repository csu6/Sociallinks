package com.csu.sociallinks.repository;

import com.csu.sociallinks.domain.User;
import com.csu.sociallinks.domain.UserExtra;

import java.util.Optional;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UserExtra entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserExtraRepository extends JpaRepository<UserExtra, Long> {
	UserExtra findOneByUser(Optional<User> user);
	UserExtra findOneByUserId(Integer userId);
    //Optional<User> findOneByLogin(String login);
}
