package com.csu.sociallinks.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.csu.sociallinks.domain.Socialnetwork;
import com.csu.sociallinks.repository.SocialnetworkRepository;
import com.csu.sociallinks.web.rest.errors.BadRequestAlertException;
import com.csu.sociallinks.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Socialnetwork.
 */
@RestController
@RequestMapping("/api")
public class SocialnetworkResource {

    private final Logger log = LoggerFactory.getLogger(SocialnetworkResource.class);

    private static final String ENTITY_NAME = "socialnetwork";

    private final SocialnetworkRepository socialnetworkRepository;

    public SocialnetworkResource(SocialnetworkRepository socialnetworkRepository) {
        this.socialnetworkRepository = socialnetworkRepository;
    }

    /**
     * POST  /socialnetworks : Create a new socialnetwork.
     *
     * @param socialnetwork the socialnetwork to create
     * @return the ResponseEntity with status 201 (Created) and with body the new socialnetwork, or with status 400 (Bad Request) if the socialnetwork has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/socialnetworks")
    @Timed
    public ResponseEntity<Socialnetwork> createSocialnetwork(@RequestBody Socialnetwork socialnetwork) throws URISyntaxException {
        log.debug("REST request to save Socialnetwork : {}", socialnetwork);
        if (socialnetwork.getId() != null) {
            throw new BadRequestAlertException("A new socialnetwork cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Socialnetwork result = socialnetworkRepository.save(socialnetwork);
        return ResponseEntity.created(new URI("/api/socialnetworks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /socialnetworks : Updates an existing socialnetwork.
     *
     * @param socialnetwork the socialnetwork to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated socialnetwork,
     * or with status 400 (Bad Request) if the socialnetwork is not valid,
     * or with status 500 (Internal Server Error) if the socialnetwork couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/socialnetworks")
    @Timed
    public ResponseEntity<Socialnetwork> updateSocialnetwork(@RequestBody Socialnetwork socialnetwork) throws URISyntaxException {
        log.debug("REST request to update Socialnetwork : {}", socialnetwork);
        if (socialnetwork.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Socialnetwork result = socialnetworkRepository.save(socialnetwork);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, socialnetwork.getId().toString()))
            .body(result);
    }

    /**
     * GET  /socialnetworks : get all the socialnetworks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of socialnetworks in body
     */
    @GetMapping("/socialnetworks")
    @Timed
    public List<Socialnetwork> getAllSocialnetworks() {
        log.debug("REST request to get all Socialnetworks");
        return socialnetworkRepository.findAll();
    }

    /**
     * GET  /socialnetworks/:id : get the "id" socialnetwork.
     *
     * @param id the id of the socialnetwork to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the socialnetwork, or with status 404 (Not Found)
     */
    @GetMapping("/socialnetworks/{id}")
    @Timed
    public ResponseEntity<Socialnetwork> getSocialnetwork(@PathVariable Long id) {
        log.debug("REST request to get Socialnetwork : {}", id);
        Optional<Socialnetwork> socialnetwork = socialnetworkRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(socialnetwork);
    }

    /**
     * DELETE  /socialnetworks/:id : delete the "id" socialnetwork.
     *
     * @param id the id of the socialnetwork to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/socialnetworks/{id}")
    @Timed
    public ResponseEntity<Void> deleteSocialnetwork(@PathVariable Long id) {
        log.debug("REST request to delete Socialnetwork : {}", id);

        socialnetworkRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
