/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SociallinksTestModule } from '../../../test.module';
import { SocialnetworkDeleteDialogComponent } from 'app/entities/socialnetwork/socialnetwork-delete-dialog.component';
import { SocialnetworkService } from 'app/entities/socialnetwork/socialnetwork.service';

describe('Component Tests', () => {
    describe('Socialnetwork Management Delete Component', () => {
        let comp: SocialnetworkDeleteDialogComponent;
        let fixture: ComponentFixture<SocialnetworkDeleteDialogComponent>;
        let service: SocialnetworkService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SociallinksTestModule],
                declarations: [SocialnetworkDeleteDialogComponent]
            })
                .overrideTemplate(SocialnetworkDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SocialnetworkDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SocialnetworkService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
