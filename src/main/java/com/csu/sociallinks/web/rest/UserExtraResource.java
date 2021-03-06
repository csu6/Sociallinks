package com.csu.sociallinks.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.csu.sociallinks.domain.User;
import com.csu.sociallinks.domain.UserExtra;
import com.csu.sociallinks.repository.UserExtraRepository;
import com.csu.sociallinks.repository.UserRepository;
import com.csu.sociallinks.service.UserService;
import com.csu.sociallinks.web.rest.errors.BadRequestAlertException;
import com.csu.sociallinks.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing UserExtra.
 */
@RestController
@RequestMapping("/api")
public class UserExtraResource {

    private final Logger log = LoggerFactory.getLogger(UserExtraResource.class);

    private static final String ENTITY_NAME = "userExtra";

    private final UserExtraRepository userExtraRepository;

    private final UserRepository userRepository;

    private final UserService userService;

    public UserExtraResource(UserExtraRepository userExtraRepository, UserRepository userRepository, UserService userService) {
        this.userExtraRepository = userExtraRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    /**
     * POST  /user-extras : Create a new userExtra.
     *
     * @param userExtra the userExtra to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userExtra, or with status 400 (Bad Request) if the userExtra has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-extras")
    @Timed
    public ResponseEntity<UserExtra> createUserExtra(@RequestBody UserExtra userExtra) throws URISyntaxException {
        log.debug("REST request to save UserExtra : {}", userExtra);
        if (userExtra.getId() != null) {
            throw new BadRequestAlertException("A new userExtra cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserExtra result = userExtraRepository.save(userExtra);
        return ResponseEntity.created(new URI("/api/user-extras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-extras : Updates an existing userExtra.
     *
     * @param userExtra the userExtra to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userExtra,
     * or with status 400 (Bad Request) if the userExtra is not valid,
     * or with status 500 (Internal Server Error) if the userExtra couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-extras")
    @Timed
    public ResponseEntity<UserExtra> updateUserExtra(@RequestBody UserExtra userExtra) throws URISyntaxException {
        log.debug("REST request to update UserExtra : {}", userExtra);
        if (userExtra.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserExtra result = userExtraRepository.save(userExtra);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userExtra.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-extras : get all the userExtras.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userExtras in body
     */
    @GetMapping("/user-extras")
    @Timed
    public List<UserExtra> getAllUserExtras() {
        log.debug("REST request to get all UserExtras");
        return userExtraRepository.findAll();
    }

    /**
     * GET  /user-extras/:id : get the "id" userExtra.
     *
     * @param id the id of the userExtra to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userExtra, or with status 404 (Not Found)
     */
    @GetMapping("/user-extras/{id}")
    @Timed
    public ResponseEntity<UserExtra> getUserExtra(@PathVariable Long id) {
        log.debug("REST request to get UserExtra : {}", id);
        Optional<UserExtra> userExtra = userExtraRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userExtra);
    }

    /**
     * GET  /user-extras/userinfo : get the current userExtra.
     *
     * @param id the id of the userExtra to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userExtra, or with status 404 (Not Found)
     */
    @GetMapping("/user-extras/userinfo")
    @Timed
    public ResponseEntity<UserExtra> getUserExtra() {
        log.debug("REST request to get UserExtra : {}");
     
    	Optional<User> user = userService.getUserWithAuthorities();
        System.out.println("====================================>"+user.get().getLogin());
        System.out.println("====================================>"+user.get().getLogin());
        System.out.println("====================================>"+user.get().getLogin());
        System.out.println("====================================>"+user.get().getLogin());
        System.out.println("====================================>"+user.get().getLogin());
        //Optional<User> user2 = userRepository.findOneByLogin(user.get().getLogin());
        UserExtra userExtra = userExtraRepository.findOneByUser(user);
        return ResponseEntity.ok(userExtra);
    }

    /**
     * DELETE  /user-extras/:id : delete the "id" userExtra.
     *
     * @param id the id of the userExtra to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-extras/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserExtra(@PathVariable Long id) {
        log.debug("REST request to delete UserExtra : {}", id);

        userExtraRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
