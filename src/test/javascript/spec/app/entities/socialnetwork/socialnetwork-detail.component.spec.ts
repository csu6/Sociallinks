/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SociallinksTestModule } from '../../../test.module';
import { SocialnetworkDetailComponent } from 'app/entities/socialnetwork/socialnetwork-detail.component';
import { Socialnetwork } from 'app/shared/model/socialnetwork.model';

describe('Component Tests', () => {
    describe('Socialnetwork Management Detail Component', () => {
        let comp: SocialnetworkDetailComponent;
        let fixture: ComponentFixture<SocialnetworkDetailComponent>;
        const route = ({ data: of({ socialnetwork: new Socialnetwork(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SociallinksTestModule],
                declarations: [SocialnetworkDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SocialnetworkDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SocialnetworkDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.socialnetwork).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
