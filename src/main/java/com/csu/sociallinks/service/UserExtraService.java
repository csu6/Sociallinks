package com.csu.sociallinks.service;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.codahale.metrics.annotation.Timed;
import com.csu.sociallinks.domain.User;
import com.csu.sociallinks.domain.UserExtra;
import com.csu.sociallinks.repository.AuthorityRepository;
import com.csu.sociallinks.repository.PersistentTokenRepository;
import com.csu.sociallinks.repository.UserExtraRepository;
import com.csu.sociallinks.repository.UserRepository;
import com.csu.sociallinks.security.SecurityUtils;
import com.csu.sociallinks.service.util.RandomUtil;
import com.csu.sociallinks.web.rest.errors.BadRequestAlertException;
import com.csu.sociallinks.web.rest.util.HeaderUtil;

/**
 * Service class for managing user extra.
 */
@Service
@Transactional
public class UserExtraService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserExtraRepository userExtraRepository;

    public UserExtraService(UserExtraRepository userExtraRepository) {
        this.userExtraRepository = userExtraRepository;
    }
    
    /**
     * Update basic information (description) for the current user.
     *
     * @param description
     */
    public void updateUserExtra(Optional<User> user, String description) {
    	UserExtra userExtra = userExtraRepository.findOneByUser(user);
    	userExtra.setDescription(description);
    	UserExtra toto = userExtraRepository.save(userExtra);
    }

}
