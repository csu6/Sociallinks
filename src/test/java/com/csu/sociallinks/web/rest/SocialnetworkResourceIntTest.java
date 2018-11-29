package com.csu.sociallinks.web.rest;

import com.csu.sociallinks.SociallinksApp;

import com.csu.sociallinks.domain.Socialnetwork;
import com.csu.sociallinks.repository.SocialnetworkRepository;
import com.csu.sociallinks.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.csu.sociallinks.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SocialnetworkResource REST controller.
 *
 * @see SocialnetworkResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SociallinksApp.class)
public class SocialnetworkResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final Boolean DEFAULT_STATUS = false;
    private static final Boolean UPDATED_STATUS = true;

    @Autowired
    private SocialnetworkRepository socialnetworkRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSocialnetworkMockMvc;

    private Socialnetwork socialnetwork;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SocialnetworkResource socialnetworkResource = new SocialnetworkResource(socialnetworkRepository);
        this.restSocialnetworkMockMvc = MockMvcBuilders.standaloneSetup(socialnetworkResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Socialnetwork createEntity(EntityManager em) {
        Socialnetwork socialnetwork = new Socialnetwork()
            .title(DEFAULT_TITLE)
            .url(DEFAULT_URL)
            .status(DEFAULT_STATUS);
        return socialnetwork;
    }

    @Before
    public void initTest() {
        socialnetwork = createEntity(em);
    }

    @Test
    @Transactional
    public void createSocialnetwork() throws Exception {
        int databaseSizeBeforeCreate = socialnetworkRepository.findAll().size();

        // Create the Socialnetwork
        restSocialnetworkMockMvc.perform(post("/api/socialnetworks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(socialnetwork)))
            .andExpect(status().isCreated());

        // Validate the Socialnetwork in the database
        List<Socialnetwork> socialnetworkList = socialnetworkRepository.findAll();
        assertThat(socialnetworkList).hasSize(databaseSizeBeforeCreate + 1);
        Socialnetwork testSocialnetwork = socialnetworkList.get(socialnetworkList.size() - 1);
        assertThat(testSocialnetwork.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testSocialnetwork.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testSocialnetwork.isStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createSocialnetworkWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = socialnetworkRepository.findAll().size();

        // Create the Socialnetwork with an existing ID
        socialnetwork.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSocialnetworkMockMvc.perform(post("/api/socialnetworks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(socialnetwork)))
            .andExpect(status().isBadRequest());

        // Validate the Socialnetwork in the database
        List<Socialnetwork> socialnetworkList = socialnetworkRepository.findAll();
        assertThat(socialnetworkList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSocialnetworks() throws Exception {
        // Initialize the database
        socialnetworkRepository.saveAndFlush(socialnetwork);

        // Get all the socialnetworkList
        restSocialnetworkMockMvc.perform(get("/api/socialnetworks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(socialnetwork.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getSocialnetwork() throws Exception {
        // Initialize the database
        socialnetworkRepository.saveAndFlush(socialnetwork);

        // Get the socialnetwork
        restSocialnetworkMockMvc.perform(get("/api/socialnetworks/{id}", socialnetwork.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(socialnetwork.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSocialnetwork() throws Exception {
        // Get the socialnetwork
        restSocialnetworkMockMvc.perform(get("/api/socialnetworks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSocialnetwork() throws Exception {
        // Initialize the database
        socialnetworkRepository.saveAndFlush(socialnetwork);

        int databaseSizeBeforeUpdate = socialnetworkRepository.findAll().size();

        // Update the socialnetwork
        Socialnetwork updatedSocialnetwork = socialnetworkRepository.findById(socialnetwork.getId()).get();
        // Disconnect from session so that the updates on updatedSocialnetwork are not directly saved in db
        em.detach(updatedSocialnetwork);
        updatedSocialnetwork
            .title(UPDATED_TITLE)
            .url(UPDATED_URL)
            .status(UPDATED_STATUS);

        restSocialnetworkMockMvc.perform(put("/api/socialnetworks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSocialnetwork)))
            .andExpect(status().isOk());

        // Validate the Socialnetwork in the database
        List<Socialnetwork> socialnetworkList = socialnetworkRepository.findAll();
        assertThat(socialnetworkList).hasSize(databaseSizeBeforeUpdate);
        Socialnetwork testSocialnetwork = socialnetworkList.get(socialnetworkList.size() - 1);
        assertThat(testSocialnetwork.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testSocialnetwork.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testSocialnetwork.isStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingSocialnetwork() throws Exception {
        int databaseSizeBeforeUpdate = socialnetworkRepository.findAll().size();

        // Create the Socialnetwork

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSocialnetworkMockMvc.perform(put("/api/socialnetworks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(socialnetwork)))
            .andExpect(status().isBadRequest());

        // Validate the Socialnetwork in the database
        List<Socialnetwork> socialnetworkList = socialnetworkRepository.findAll();
        assertThat(socialnetworkList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSocialnetwork() throws Exception {
        // Initialize the database
        socialnetworkRepository.saveAndFlush(socialnetwork);

        int databaseSizeBeforeDelete = socialnetworkRepository.findAll().size();

        // Get the socialnetwork
        restSocialnetworkMockMvc.perform(delete("/api/socialnetworks/{id}", socialnetwork.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Socialnetwork> socialnetworkList = socialnetworkRepository.findAll();
        assertThat(socialnetworkList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Socialnetwork.class);
        Socialnetwork socialnetwork1 = new Socialnetwork();
        socialnetwork1.setId(1L);
        Socialnetwork socialnetwork2 = new Socialnetwork();
        socialnetwork2.setId(socialnetwork1.getId());
        assertThat(socialnetwork1).isEqualTo(socialnetwork2);
        socialnetwork2.setId(2L);
        assertThat(socialnetwork1).isNotEqualTo(socialnetwork2);
        socialnetwork1.setId(null);
        assertThat(socialnetwork1).isNotEqualTo(socialnetwork2);
    }
}
