package com.csu.sociallinks.repository;

import com.csu.sociallinks.domain.Link;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Link entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LinkRepository extends JpaRepository<Link, Long> {

    @Query("select link from Link link where link.user.login = ?#{principal.username}")
    List<Link> findByUserIsCurrentUser();

}
