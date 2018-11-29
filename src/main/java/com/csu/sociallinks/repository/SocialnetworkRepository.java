package com.csu.sociallinks.repository;

import com.csu.sociallinks.domain.Socialnetwork;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Socialnetwork entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SocialnetworkRepository extends JpaRepository<Socialnetwork, Long> {

}
