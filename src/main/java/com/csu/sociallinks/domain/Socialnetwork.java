package com.csu.sociallinks.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Socialnetwork.
 */
@Entity
@Table(name = "socialnetwork")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Socialnetwork implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "url")
    private String url;

    @Column(name = "status")
    private Boolean status;

    @OneToMany(mappedBy = "socialnetwork")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Link> links = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Socialnetwork title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public Socialnetwork url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Boolean isStatus() {
        return status;
    }

    public Socialnetwork status(Boolean status) {
        this.status = status;
        return this;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Set<Link> getLinks() {
        return links;
    }

    public Socialnetwork links(Set<Link> links) {
        this.links = links;
        return this;
    }

    public Socialnetwork addLink(Link link) {
        this.links.add(link);
        link.setSocialnetwork(this);
        return this;
    }

    public Socialnetwork removeLink(Link link) {
        this.links.remove(link);
        link.setSocialnetwork(null);
        return this;
    }

    public void setLinks(Set<Link> links) {
        this.links = links;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Socialnetwork socialnetwork = (Socialnetwork) o;
        if (socialnetwork.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), socialnetwork.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Socialnetwork{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", url='" + getUrl() + "'" +
            ", status='" + isStatus() + "'" +
            "}";
    }
}
