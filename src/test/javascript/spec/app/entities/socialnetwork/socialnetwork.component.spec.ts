/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SociallinksTestModule } from '../../../test.module';
import { SocialnetworkComponent } from 'app/entities/socialnetwork/socialnetwork.component';
import { SocialnetworkService } from 'app/entities/socialnetwork/socialnetwork.service';
import { Socialnetwork } from 'app/shared/model/socialnetwork.model';

describe('Component Tests', () => {
    describe('Socialnetwork Management Component', () => {
        let comp: SocialnetworkComponent;
        let fixture: ComponentFixture<SocialnetworkComponent>;
        let service: SocialnetworkService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SociallinksTestModule],
                declarations: [SocialnetworkComponent],
                providers: []
            })
                .overrideTemplate(SocialnetworkComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SocialnetworkComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SocialnetworkService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Socialnetwork(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.socialnetworks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
