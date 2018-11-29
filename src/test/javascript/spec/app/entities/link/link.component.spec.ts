/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SociallinksTestModule } from '../../../test.module';
import { LinkComponent } from 'app/entities/link/link.component';
import { LinkService } from 'app/entities/link/link.service';
import { Link } from 'app/shared/model/link.model';

describe('Component Tests', () => {
    describe('Link Management Component', () => {
        let comp: LinkComponent;
        let fixture: ComponentFixture<LinkComponent>;
        let service: LinkService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SociallinksTestModule],
                declarations: [LinkComponent],
                providers: []
            })
                .overrideTemplate(LinkComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LinkComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LinkService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Link(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.links[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
